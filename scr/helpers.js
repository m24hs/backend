module.exports = {
    checkErrors: (response) => {
        if (response.hasOwnProperty('error')) {
            console.log(response.data.error);
            return true;
        }
        return false;
    }
}