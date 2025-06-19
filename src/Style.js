// Set style for by returning the style object to the respective element
const countryButtonStyle = (country, isMouseOver, isFocus, mode) => {
    if (isMouseOver === country) {
        if (mode.theme === "light") {
            return {
                backgroundColor: 'red',
                color: "white",
                transition: "all 0.3s ease"
            };
        }
        else if (mode.theme === "dark") {
            return {
                backgroundColor: '#fefee3',
                color: "black",
                transition: "all 0.3s ease"
            };
        }
    }
    else if (isFocus === country) {
        if (mode.theme === "light") {
            return {
                backgroundColor: "transparent",
                border: "none",
                borderBottom: '2px solid red'
            }
        }
        else if (mode.theme === "dark") {
            return {
                backgroundColor: "transparent",
                border: "none",
                borderBottom: '2px solid white',
                color: "white"
            }
        }
    }
    else {
        if (mode.theme === "light") {
            return {
                border: "none",
                borderBottom: "2px solid transparent", // Reserve space to avoid shifting
                borderRadius: 0,
                backgroundColor: "transparent", // Optional
                color: "black"
            };
        }
        else if (mode.theme === "dark") {
            return {
                border: "none",
                borderBottom: "2px solid transparent", // Reserve space to avoid shifting
                borderRadius: 0,
                backgroundColor: "transparent", // Optional
                color: "white"
            };
        }
    }
}

//Set the sytle for news link on hover
const newsLinkStyle = (isNewsLinkMouseOver, mode) => {
    if (isNewsLinkMouseOver) {
        return {
            color: "blue",
            textDecoration: "none",
        }
    }
    else {
        return {
            color: "black",
            textDecoration: "none",
        }
    }
}

// Set style for article title
const articleTitleStyle = (idx, idxArray) => {
    // let idxArray = getCountryArticleIndexArray(country, expandedIndexes)
    if (idxArray.includes(idx)) {
        return {
            backgroundColor: "red",
            color: "white",
            otline: "none",
            boxShadow: "none"
        };
    }
    else {
        return {
            outline: "none",
            boxShadow: "none"
        };
    }
}


export { countryButtonStyle, newsLinkStyle, articleTitleStyle };