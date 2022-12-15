import http from "./http";

export default (resource: any) => ({
    index(query = {}) {
        return http.get(`/${resource}?${new URLSearchParams(query)}`);
    },

    show(id: string) {
        return http.get(`/${resource}/${id}`);
    },

    create(payload: any, config = {}) {
        return http.post(`/${resource}`, payload, config);
    },

    update(payload: any, id: any, config = {}) {
        return http.put(`/${resource}/${id}`, payload, config);
    },

    delete(id: string) {
        return http.delete(`/${resource}/${id}`);
    },
});