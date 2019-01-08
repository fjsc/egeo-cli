import { LitElement } from "@polymer/lit-element";
import { TemplateResult } from "lit-html";
/**
 * Use the customElement decorator to define your class as
 * a custom element. Registers <my-element> as an HTML tag.
 */
export declare class StElement extends LitElement {
    /**
     * Create an observed property. Triggers update on change.
     */
    foo: string;
    /**
     * Implement `render` to define a template for your element.
     */
    render(): TemplateResult;
}
