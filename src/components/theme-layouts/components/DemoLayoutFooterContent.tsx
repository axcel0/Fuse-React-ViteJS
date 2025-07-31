import PoweredByLinks from './PoweredByLinks';
import DocumentationButton from './DocumentationButton';
import PurchaseButton from './PurchaseButton';

/**
 * The demo layout footer content.
 */
function DemoLayoutFooterContent() {
	return (
		<>
			<div className="flex grow shrink-0">
				<PurchaseButton className="mx-0.25" />
				<DocumentationButton className="mx-0.25" />
			</div>

			<div className="flex grow shrink-0 px-0.75 justify-end">
				<PoweredByLinks />
			</div>
		</>
	);
}

export default DemoLayoutFooterContent;
