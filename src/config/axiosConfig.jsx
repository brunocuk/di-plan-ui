import axios from "axios";
import constantsExport from './constants';
import {ROUTES} from "./routes";

const initializeAxios = () => {
    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent

        const token = localStorage.getItem(constantsExport.SESSION_TOKEN)
        // config.headers.common['organisationId'] = "1";
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + localStorage.getItem(constantsExport.SESSION_TOKEN);
        }

        switch (config?.userType) {
            case constantsExport.UserTypes.DS:
                config.headers[constantsExport.X_APPLICATION_TYPE] = "ds";
                break;
            default:
                config.headers[constantsExport.X_APPLICATION_TYPE] = "user";
                break;
        }

        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    axios.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response?.config?.url?.Of("/me") < 0 && error.response?.config?.url?.Of(ROUTES.LOGIN) < 0 && error.response.status === 401) {
                console.error("Unauthorized request! Send to login page!");
                window.location.href = ROUTES.LOGIN;
            }
            return Promise.reject(error);
        }
    );

}

export {
    initializeAxios
}
