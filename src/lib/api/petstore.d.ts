/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/pet": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List all pets
         * @description Returns all pets in the store
         */
        get: operations["listPets"];
        put?: never;
        /**
         * Add a new pet to the store
         * @description Add a new pet to the store
         */
        post: operations["addPet"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/pet/{petId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Find pet by ID
         * @description Returns a single pet
         */
        get: operations["getPetById"];
        put?: never;
        /** Updates a pet in the store */
        post: operations["updatePet"];
        /** Deletes a pet */
        delete: operations["deletePet"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /**
         * @description pet status in the store
         * @enum {string}
         */
        PetStatus: "available" | "pending" | "sold";
        Pet: {
            /**
             * Format: int64
             * @example 10
             */
            id?: number;
            /** @example doggie */
            name: string;
            photoUrls?: string[];
            status?: components["schemas"]["PetStatus"];
        };
        Error: {
            /** Format: int32 */
            code: number;
            message: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: {
        /** @description Pet object that needs to be added to the store */
        Pet: {
            content: {
                "application/json": components["schemas"]["Pet"];
            };
        };
    };
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    listPets: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Pet"][];
                };
            };
            /** @description Invalid input */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    addPet: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Create a new pet in the store */
        requestBody: {
            content: {
                "application/json": components["schemas"]["Pet"];
            };
        };
        responses: {
            /** @description Successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Pet"];
                };
            };
            /** @description Invalid input */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    getPetById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of pet to return */
                petId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Pet"];
                };
            };
            /** @description Pet not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    updatePet: {
        parameters: {
            query?: {
                /** @description Name of pet that needs to be updated */
                name?: string;
                /** @description Status of pet that needs to be updated */
                status?: components["schemas"]["PetStatus"];
            };
            header?: never;
            path: {
                /** @description ID of pet that needs to be updated */
                petId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Invalid input */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Pet not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    deletePet: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Pet id to delete */
                petId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Pet not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
}
