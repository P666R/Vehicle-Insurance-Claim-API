import { ZodError } from 'zod';

// Validate request data against a Zod schema
const validate = (schema) => async (req, res, next) => {
  try {
    // Validate body, query, or params based on schema context
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: error.errors.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        })),
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

export default validate;
