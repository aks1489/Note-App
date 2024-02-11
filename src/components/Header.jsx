export default function Header(props) {
    const theme = props.theme
    const handleTheme = props.handleTheme
    return(
            <nav className={theme}>
                <h2 className={theme} >Note MED</h2>
                <label className="ui-switch">
                    <input type="checkbox" checked={theme} onChange={handleTheme}/>
                    <div className="slider">
                        <div className="circle"></div>
                    </div>
                </label>
            </nav>
    )
}