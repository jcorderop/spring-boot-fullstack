import fetch from 'unfetch'

const checkStatus = response => {
        if (response.ok) {
                Promise.resolve();
            return response;
        }
        // convert non-2xx HTTP responses into errors:
        const error = new Error(response.statusText);
        error.response = response;
        return Promise.reject(error);
        }

export const getUsersByType = (type) =>
        fetch("api/v1/users?type="+type)
                .then(checkStatus);

export const addNewUser = user =>
        fetch("api/v1/users", {
                        headers: {
                                'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify(user)
                }
        );


