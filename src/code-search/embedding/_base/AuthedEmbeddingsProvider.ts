import { EmbeddingsProvider } from "./EmbeddingsProvider";
import { Embedding } from "./Embedding";

export interface AuthedEmbedOptions {
	apiBase?: string;
	apiKey?: string;
	model?: string;
}

export class AuthedEmbeddingsProvider implements EmbeddingsProvider {
	options: AuthedEmbedOptions;
	static defaultOptions: Partial<AuthedEmbedOptions> | undefined = undefined;

	get id(): string {
		throw new Error("Method not implemented.");
	}

	constructor(options: AuthedEmbedOptions) {
		this.options = {
			...(this.constructor as typeof AuthedEmbeddingsProvider).defaultOptions,
			...options,
		};
	}

	embed(chunks: string[]): Promise<Embedding[]> {
		throw new Error("Method not implemented.");
	}
}

export default AuthedEmbeddingsProvider;
