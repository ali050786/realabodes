import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import * as pdfjsLib from "pdfjs-dist";
import { Project, commonAmenities } from "@/lib/projects-data";
// Use the Vite-recommended way to load the worker
// @ts-ignore
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;

const model = new ChatGroq({
  apiKey: groqApiKey,
  model: "llama-3.3-70b-versatile",
  temperature: 0,
});

// Define the schema for structured output
const projectSchema = z.object({
  title: z.string().describe("The name of the property project"),
  subtitle: z.string().describe("A short tagline or subtitle for the project"),
  location: z.string().describe("The location/area of the project (e.g., Baner, Pune)"),
  priceRange: z.string().describe("The starting price or price range (e.g., Starts from ₹1.5 Cr)"),
  category: z.enum(["Residential", "Apartments", "Commercial and Apartments", "Commercials", "Villas", "Plots"]).describe("The category of the property"),
  client: z.string().optional().describe("The developer or client name"),
  year: z.string().optional().describe("The year of completion or launch"),
  duration: z.string().optional().describe("The construction duration"),
  reraNumber: z.string().optional().describe("The RERA registration number"),
  fullDescription: z.string().describe("A detailed description of the property"),
  highlights: z.array(z.string()).describe("Key highlights or selling points"),
  tags: z.array(z.string()).describe("Relevant tags (e.g., Luxury, Smart Home)"),
  metrics: z.array(z.object({
    label: z.string(),
    value: z.string()
  })).max(4).describe("Key metrics like Total Units, Floor Area, etc. (Max 4)"),
  amenities: z.array(z.string()).describe("List of amenities found in the brochure"),
});

const parser = StructuredOutputParser.fromZodSchema(projectSchema);

const promptTemplate = new PromptTemplate({
  template: `
    You are an expert real estate data extractor. 
    Analyze the following text extracted from a property brochure PDF and extract the property details.
    
    If a field is not found, leave it empty or provide a best guess based on context.
    For amenities, extract all mentioned amenities.
    
    {format_instructions}
    
    Brochure Text:
    {brochure_text}
  `,
  inputVariables: ["brochure_text"],
  partialVariables: { format_instructions: parser.getFormatInstructions() },
});

export const extractTextFromPdf = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(" ");
    fullText += pageText + "\n";
  }

  return fullText;
};

export const extractPropertyDetails = async (file: File): Promise<Partial<Project>> => {
  try {
    const brochureText = await extractTextFromPdf(file);
    
    // Check if text is too long for the model, though llama-3-70b has a large context
    const truncatedText = brochureText.slice(0, 30000); 

    const input = await promptTemplate.format({
      brochure_text: truncatedText,
    });

    const response = await model.invoke(input);
    const result = await parser.parse(response.content as string);

    // Map extracted amenities to commonAmenities IDs/names
    const mappedAmenities = commonAmenities.filter(amenity => 
      result.amenities.some(ext => 
        ext.toLowerCase().includes(amenity.name.toLowerCase()) || 
        amenity.name.toLowerCase().includes(ext.toLowerCase())
      )
    );

    return {
      title: result.title || '',
      subtitle: result.subtitle || '',
      location: result.location || '',
      priceRange: result.priceRange || '',
      category: result.category || 'Residential',
      client: result.client || '',
      year: result.year || new Date().getFullYear().toString(),
      duration: result.duration || '',
      reraNumber: result.reraNumber || '',
      fullDescription: result.fullDescription || '',
      highlights: result.highlights || [],
      tags: result.tags || [],
      metrics: (result.metrics || []).map(m => ({
        label: m.label || '',
        value: m.value || ''
      })),
      amenities: mappedAmenities,
      status: 'planning',
      slug: (result.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    } as Partial<Project>;
  } catch (error) {
    console.error("Error extracting property details:", error);
    throw error;
  }
};
