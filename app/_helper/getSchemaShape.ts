import { ZodTypeAny, ZodObject, ZodEffects } from "zod";

const getSchemaShape = (schema: ZodTypeAny): Record<string, ZodTypeAny> => {
    if (schema instanceof ZodObject) {
        return schema.shape;
    }

    if (schema instanceof ZodEffects) {
        const innerSchema = schema._def.schema;
        if (innerSchema) {
            return getSchemaShape(innerSchema);
        }
    }

    return {};
};

export default getSchemaShape;
