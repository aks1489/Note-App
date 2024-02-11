export default function Header(props) {
    const theme = props.theme
    const handleTheme = props.handleTheme
    return(
            <nav className={theme}>
                <h2 className={theme} >Note MED</h2>
                <label class="ui-switch">
                    <input type="checkbox" checked={theme} onClick={handleTheme}/>
                    <div class="slider">
                        <div class="circle"></div>
                    </div>
                </label>
            </nav>
    )
}