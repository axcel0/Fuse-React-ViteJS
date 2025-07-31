import React from 'react';
import { styled } from '@mui/material/styles';
import { Editor } from '@tinymce/tinymce-react';
import DOMPurify from 'dompurify';
import clsx from 'clsx';

/**
 * The root component of the WYSIWYG editor.
 */
const Root = styled('div')({
	'& .tox-tinymce': {
		border: 'none !important',
		borderRadius: '4px',
	},
	'& .tox-toolbar__primary': {
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
	},
	'& .tox-editor-header': {
		borderTopLeftRadius: '4px',
		borderTopRightRadius: '4px',
	},
	'& .tox-edit-area__iframe': {
		minHeight: '256px !important',
	},
});

/* The props for the WYSIWYG editor component.
 */
type WYSIWYGEditorProps = {
	className?: string;
	onChange: (content: string) => void;
	initialValue?: string;
	ref: React.ForwardedRef<HTMLDivElement>;
};

/**
 * The WYSIWYG editor component.
 */
function WYSIWYGEditor(props: WYSIWYGEditorProps) {
	const { onChange, className = '', initialValue = '', ref } = props;

	/**
	 * The function to call when the editor content changes.
	 */
	function handleEditorChange(content: string) {
		// Sanitize the HTML to prevent XSS attacks
		const sanitizedHtml = DOMPurify.sanitize(content, {
			ALLOWED_TAGS: [
				'p',
				'br',
				'strong',
				'em',
				'u',
				'ol',
				'ul',
				'li',
				'a',
				'h1',
				'h2',
				'h3',
				'h4',
				'h5',
				'h6',
				'blockquote',
				'code',
				'pre',
			],
			ALLOWED_ATTR: ['href', 'target', 'title', 'style'],
			ALLOW_DATA_ATTR: false,
		});

		onChange(sanitizedHtml);
	}

	return (
		<Root className={clsx('w-full overflow-hidden rounded-sm border-1', className)} ref={ref}>
			<Editor
				apiKey="no-api-key"
				initialValue={initialValue}
				onEditorChange={handleEditorChange}
				init={{
					height: 256,
					menubar: false,
					plugins: [
						'advlist',
						'autolink',
						'lists',
						'link',
						'charmap',
						'preview',
						'anchor',
						'searchreplace',
						'visualblocks',
						'code',
						'fullscreen',
						'insertdatetime',
						'table',
						'help',
						'wordcount',
						'autoresize',
					],
					toolbar:
						'undo redo | blocks | ' +
						'bold italic underline forecolor backcolor | alignleft aligncenter ' +
						'alignright alignjustify | bullist numlist outdent indent | ' +
						'removeformat | help',
					content_style:
						'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px }',
					branding: false,
					resize: false,
					statusbar: false,
					// Security settings
					allow_script_urls: false,
					allow_html_data_urls: false,
					paste_data_images: false,
					paste_webkit_styles: 'none',
					paste_retain_style_properties: 'color font-size font-family',
				}}
			/>
		</Root>
	);
}

export default WYSIWYGEditor;
