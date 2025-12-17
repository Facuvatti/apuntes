        import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
        
        mermaid.initialize({ 
            startOnLoad: true,
            theme: 'base',
            logLevel: 'debug',
            themeVariables: {
                // Colores principales del mindmap
                primaryColor: '#3f46ff',        // Color principal de los nodos
                primaryTextColor: '#ffffff',    // Texto en nodos principales
                primaryBorderColor: '#8aa4ff',  // Borde de nodos principales
                
                // Colores secundarios
                secondaryColor: '#029df7',      // Nodos secundarios
                secondaryTextColor: '#eaeaf0',  // Texto en nodos secundarios
                secondaryBorderColor: '#2a2f55',
                
                // Colores terciarios
                tertiaryColor: '#171a2e',       // Nodos de tercer nivel
                tertiaryTextColor: '#cdd6ff',
                tertiaryBorderColor: '#3f46ff',
                
                // Fondo y líneas
                background: '#0f1220',
                mainBkg: '#3f46ff',
                lineColor: '#8aa4ff',
                
                // Colores adicionales para ramas
                pie1: '#3f46ff',
                pie2: '#5a61ff',
                pie3: '#7580ff',
                pie4: '#8f9aff',
                pie5: '#a9b3ff',
                pie6: '#c3ccff',
                pie7: '#029df7',
                pie8: '#2a2f55',
                pie9: '#353a70',
                pie10: '#40468b',
                pie11: '#4b51a6',
                pie12: '#565cc1'
            }
        });
        
        console.log('Mermaid inicializado');