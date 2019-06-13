const translate = (lang, code) => {
    const TRANSLATE_COLLECTION = {
        "SUCCESS" : {
            "bg" : "bg zaqvka e uspeshna",
            "en" : "en sucess"
        },
        "ERROR" : {
            "bg" : "bg error",
            "en" : "en error"
		},
		"API_BOOKS_FETCH_SUCCESS": {
			"bg" : "bg uspeh fetch",
			"en" : "en sucess fetch"
		},
		"API_BOOKS_FETCH_ERROR": {
			"bg" : "bg fetch error",
			"en" : "en fetch error"
		},
		"DEFAULT" : {
			"bg" : "bg generic error",
			"en" : "en generic error"
		}
		}

	var translationCode = TRANSLATE_COLLECTION[code];

	console.log(translationCode);

	if(translationCode	== undefined) translationCode = "DEFAULT";

	if( translationCode[lang] == undefined) {
		return TRANSLATE_COLLECTION.DEFAULT.en;
	} 

	return TRANSLATE_COLLECTION[code][lang];
}

module.exports	= translate;