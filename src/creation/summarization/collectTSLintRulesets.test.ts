import { collectTSLintRulesets } from "./collectTSLintRulesets";

describe("collectTSLintRulesets", () => {
    it("includes mapped ESLint extensions for a full TSLint extension when it exists", () => {
        const tslint = {
            full: {
                extends: ["tslint:recommended", "tslint-react"],
            },
            raw: {},
        };

        const extensions = collectTSLintRulesets(tslint);

        expect(extensions).toEqual([
            "plugin:@typescript-eslint/recommended",
            "plugin:@typescript-eslint/recommended-requiring-type-checking",
            "plugin:react/recommended",
        ]);
    });

    it("includes mapped ESLint extensions for a raw TSLint extension when it exists", () => {
        const tslint = {
            full: {},
            raw: {
                extends: ["tslint:recommended", "tslint-react"],
            },
        };

        const extensions = collectTSLintRulesets(tslint);

        expect(extensions).toEqual([
            "plugin:@typescript-eslint/recommended",
            "plugin:@typescript-eslint/recommended-requiring-type-checking",
            "plugin:react/recommended",
        ]);
    });

    it("ignores a TSLint extension when it has no mapped ESLint extensions", () => {
        const tslint = {
            full: {
                extends: ["does not exist"],
            },
            raw: {
                extends: ["also does not exist"],
            },
        };

        const extensions = collectTSLintRulesets(tslint);

        expect(extensions).toEqual([]);
    });
});
