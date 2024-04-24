import { VSCodeTemplateLoader } from "./loader/VSCodeTemplateLoader";
import { TemplateRender } from "./template/TemplateRender";
import { TemplateContext } from "./template/TemplateContext";
import { ToolchainContextManager } from "../toolchain-context/ToolchainContextManager";
import { ToolchainContextItem, CreateToolchainContext } from "../toolchain-context/ToolchainContextProvider";
import { CustomActionPrompt } from "./team-prompts/CustomActionPrompt";
import { NamedElementBlock } from "../editor/document/NamedElementBlock";

export enum ActionType {
	AutoDoc,
	AutoTest,
	GenApiData,
}

export class PromptManager {
	private static _instance: PromptManager;
	private templateLoader: VSCodeTemplateLoader;

	private constructor() {
		this.templateLoader = new VSCodeTemplateLoader();
	}

	static getInstance(): PromptManager {
		if (!PromptManager._instance) {
			PromptManager._instance = new PromptManager();
		}
		return PromptManager._instance;
	}

	async collectToolchain(context: CreateToolchainContext): Promise<ToolchainContextItem[]> {
		return ToolchainContextManager.instance().collectContextItems(context);
	}

	async registerCustomPrompt(): Promise<void> {
		// todos and call constructCustomPrompt
	}

	/**
	 * Constructs a custom intention prompt using the [Velocity] templating engine.
	 *
	 * This function is used to generate a custom prompt message for an intention action based on the provided PsiElement, selected text,
	 * before and after cursor text. It uses a set of [VariableResolver]s to resolve variables within the template and populate the
	 * [VelocityContext].
	 *
	 * The [VelocityContext] is then used to evaluate the template and generate the prompt message.
	 *
	 * @param psiElement The PsiElement to use for resolving variables.
	 * @param selectedText The selected text in the editor.
	 * @param beforeCursor The text before the cursor.
	 * @param afterCursor The text after the cursor.
	 * @return A [CustomIntentionPrompt] with the generated prompt message.
	 */
	async constructCustomPrompt(
		psiElement: NamedElementBlock,
		selectedText: string,
		beforeCursor: string,
		afterCursor: string
	): Promise<CustomActionPrompt[]> {

		return [];
	}

	/**
	 * Asynchronously builds a string based on the specified ActionType and TemplateContext.
	 *
	 * @param type The ActionType enum value indicating the type of action to perform.
	 * @param context The TemplateContext object containing data to be used in the template rendering.
	 * @returns A Promise that resolves to a string generated by rendering the template with the provided context.
	 */
	async build(type: ActionType, context: TemplateContext): Promise<string> {
		let templateRender = new TemplateRender(this.templateLoader);
		let template: string;

		switch (type) {
			case ActionType.AutoDoc:
				template = await templateRender.getTemplate("prompts/genius/en/code/auto-doc.vm");
				break;
			case ActionType.AutoTest:
				template = await templateRender.getTemplate("prompts/genius/en/code/test-gen.vm");
				break;
			case ActionType.GenApiData:
				template = await templateRender.getTemplate("prompts/genius/en/code/gen-api-data.vm");
		}

		return templateRender.render(template, context);
	}
}