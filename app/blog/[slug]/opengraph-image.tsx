import { ImageResponse } from "next/og"
import { getPost } from "@/lib/getPost"

export const runtime = "edge"

const getFontData = async () => {
  const [fontRegular, fontBold] = await Promise.all([
    fetch(
      new URL("/fonts/Montserrat-Regular.ttf", "https://carwash-landingpage.vercel.app/") // Use a base URL to create a path
    ).then((res) => res.arrayBuffer()),
    fetch(
      new URL("/fonts/Montserrat-ExtraBold.ttf", "https://carwash-landingpage.vercel.app/")
    ).then((res) => res.arrayBuffer()),
  ]);
  return { fontRegular, fontBold };
};
interface Props {
  params: {
    slug: string
  }
}

export default async function og({ params: { slug } }: Props) {
  try {
    const { fontRegular, fontBold } = await getFontData();

    const values = getPost(slug);
    const truncatedTitle = values.title.length > 100 
      ? `${values.title.slice(0, 100)}...` 
      : values.title;

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(45deg, #0b1120, #0d3256)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
            fontFamily: "Montserrat", // Base font family
          }}
        >
          {/* Title with ExtraBold */}
          <h2 style={{
            color: "white",
            fontSize: "3rem",
            fontWeight: 800, // Matches ExtraBold
            width: "100%",
            maxWidth: "800px",
            textAlign: "center",
            marginBottom: "1rem",
            lineHeight: 1.2
          }}>
            {truncatedTitle}
          </h2>
          
          {/* Description with Regular */}
          <p style={{
            color: "#ccc",
            fontSize: "1.5rem",
            fontWeight: 400, // Matches Regular
            width: "100%",
            maxWidth: "800px",
            textAlign: "center",
            lineHeight: 1.5,
            marginBottom: "2rem"
          }}>
            {values.description}
          </p>
          
          {/* URL Box */}
          <div style={{
            background: "#133c7f",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.35rem",
            fontSize: "1.2rem",
            fontFamily: "Montserrat", // Explicitly set
            fontWeight: 400 // Regular weight
          }}>
            {process.env.NEXT_PUBLIC_URL}/{values.url}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630, // Standard OG image size
        fonts: [
          {
            name: "Montserrat",
            data: fontRegular,
            weight: 400,
            style: "normal",
          },
          {
            name: "Montserrat",
            data: fontBold,
            weight: 800,
            style: "normal",
          },
        ],
      }
    );
  } catch (error) {
    console.error("OG Image Generation Error:", error);
    return new Response(`Failed to generate image`, { status: 500 });
  }
}