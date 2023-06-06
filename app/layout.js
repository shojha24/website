import '@styles/globals.css';
import Nav from "@components/Nav";

export const metadata = {
    title: "EchoReader",
    description: "An OCR for the visually impaired"
}

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </head>
            <body>
            <Nav/>
                <div className="main">
                    <div className="gradient"/>
                </div>

                <main className="app">
                    {children}
                </main>
            </body>
        </html>
    )
}

export default RootLayout;