import fs from 'fs';
import path from 'path';
import handlebars, { template } from 'handlebars';

const templatesDir = path.join(__dirname, '..', 'templates');

/**
 * Renders a template using handlebars
 * @param templateName - Name of the `.hbs` file
 * @param variables - Variables to be passed to the template
 * @returns Html string
 */
 
export const renderTemplate = async (
    templateName: string,
    variables: Record<string, any>
): Promise<string> => {
    try {
        const templatePath = path.join(templatesDir, `${templateName}.hbs`);

        if (!fs.existsSync(templatePath)) {
            throw new Error(`Template ${templateName} not found`);
        }

        const templateSource = await fs.promises.readFile(templatePath, 'utf8');
        const complied = handlebars.compile(templateSource);

        return complied(variables);
    } catch (error) {
        console.error('Failed to render template', error);
        throw new Error('Failed to render template');
    }
}