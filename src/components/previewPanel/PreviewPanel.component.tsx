import * as React from 'react';
import Measure from 'react-measure';
import CloseIcon from '@material-ui/icons/Close';
import Refresh from '@material-ui/icons/Refresh';
import Settings from '@material-ui/icons/SettingsOutlined';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { BuilderLayout } from '../builder/Builder.component';
import { Wrapper } from './PreviewPanelWrapper.component';
import * as styles from './PreviewPanel.scss';

export type PreviewPanelProps = {
	ExportTypePreview: any; // TODO
	numPreviewRows: number;
	builderLayout: BuilderLayout;
	togglePreview: () => void;
	refreshPreview: () => void;
	toggleExportSettings: () => void;
	exportTypeSettings: any; // TODO
	exportSettingsVisible: boolean;
	showRowNumbers: boolean;
	enableLineWrapping: boolean;
	data: any;
	theme: string;
	previewTextSize: number;
	i18n: any;
};

const getThemeName = (theme: string): string => `theme${theme.charAt(0).toUpperCase() + theme.slice(1)}`;

const PreviewPanel = ({
	ExportTypePreview, i18n, theme, builderLayout, togglePreview, numPreviewRows, data, exportTypeSettings, showRowNumbers,
	enableLineWrapping, previewTextSize, refreshPreview, toggleExportSettings, exportSettingsVisible
}: PreviewPanelProps): React.ReactNode => {
	const [dimensions, setDimensions] = React.useState<any>({ height: 0, width: 0 });

	const getNoResults = (): JSX.Element | null => {
		if (data.rows.length > 0) {
			return null;
		}
		return (
			<div className={styles.noResults}>
				<ArrowDropUp style={{ fontSize: 300, position: 'absolute' }} />
				<div style={{ height: '100%', margin: 'auto' }}>
					<h1>{i18n.previewPanelNoData}</h1>
					<p>{i18n.addSomeDataDesc}</p>
				</div>
			</div>
		);
	};

	const panelDimensions = {
		...dimensions,
		right: 0
	};

	if (exportSettingsVisible) {
		delete panelDimensions.height;
		delete panelDimensions.width;
		panelDimensions.top = 0;
		panelDimensions.left = 400;
		panelDimensions.bottom = 0;
	} else {
		delete panelDimensions.width;
		delete panelDimensions.height;
		panelDimensions.bottom = 71;
	}

	const themeName = getThemeName(theme);
	return (
		<>
			<Measure bounds onResize={(contentRect: any): void => setDimensions(contentRect.bounds)}>
				{({ measureRef }): any => <div ref={measureRef} style={{ height: '100%' }} />}
			</Measure>
			<Wrapper>
				<div
					className={`${styles.previewPanel} ${themeName}`}
					style={{
						position: 'absolute',
						...panelDimensions
					}}>
					<div style={{ height: '100%' }}>
						<div className={styles.controls}>
							<span onClick={toggleExportSettings}>
								<Tooltip title="Settings" placement="bottom">
									<IconButton size="small" aria-label="Settings">
										<Settings fontSize="large" />
									</IconButton>
								</Tooltip>
							</span>
							<span onClick={refreshPreview}>
								<Tooltip title={i18n.refreshPanel} placement="bottom">
									<IconButton size="small" aria-label={i18n.refreshPanel}>
										<Refresh fontSize="large" />
									</IconButton>
								</Tooltip>
							</span>
							<span onClick={togglePreview}>
								<Tooltip title={i18n.closePanel} placement="bottom">
									<IconButton size="small" aria-label={i18n.closePanel}>
										<CloseIcon fontSize="large" />
									</IconButton>
								</Tooltip>
							</span>
						</div>

						{getNoResults()}

						<div className={styles.preview} style={{
							fontSize: `${previewTextSize}px`,
							lineHeight: `${previewTextSize + 7}px`
						}}>
							<ExportTypePreview
								numPreviewRows={numPreviewRows}
								builderLayout={builderLayout}
								exportTypeSettings={exportTypeSettings}
								showRowNumbers={showRowNumbers}
								enableLineWrapping={enableLineWrapping}
								data={data}
								theme={theme}
							/>
						</div>
					</div>
				</div>
			</Wrapper>
		</>
	);
};

export default PreviewPanel;

