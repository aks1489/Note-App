export default function Footer(props) {
    const theme = props.theme
    return(
        <footer className={theme}>
            <h4 className={theme}>Made With⚡ ~ <span className={`credit ${theme}`}>Akash</span></h4>
        </footer>
    )
} 