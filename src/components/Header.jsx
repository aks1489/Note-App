export default function Header(props) {
    return(
            <nav className={props.theme}>
                <h2 className={props.theme} onClick={props.handleTheme}>Note MED</h2>
            </nav>
    )
}