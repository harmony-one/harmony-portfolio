import {ThemeConfig, theme} from 'antd';
import {AppTheme} from "../hooks/useTheme";

export const getAntdThemeConfig = (appTheme: AppTheme): ThemeConfig => {
  return {
    algorithm: appTheme === AppTheme.dark
      ? theme.darkAlgorithm
      : theme.defaultAlgorithm,
    components: {
      Menu: {
        activeBarBorderWidth: 0
      },
      Table: {
        cellFontSize: 14
      },
    }
  }
}
