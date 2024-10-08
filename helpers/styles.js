export const styles = {
    lightMode: {
      backgroundColor: '#FFFFFF',
      textColor: '#000000',
      cardBackground: '#F5F5F5',
      accentColor: '#007AFF'
    },
    darkMode: {
      backgroundColor: '#000000',
      textColor: '#FFFFFF',
      cardBackground: '#1C1C1E',
      accentColor: '#0A84FF'
    },
    common: {
      padding: 16,
      borderRadius: 8,
      fontSize: {
        small: 12,
        medium: 16,
        large: 20
      },
      spacing: {
        small: 8,
        medium: 16,
        large: 24
      }
    }
  };
  
  export const createScreenStyles = (theme) => ({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      padding: styles.common.padding
    },
    text: {
      color: theme.textColor,
      fontSize: styles.common.fontSize.medium
    },
    input: {
      borderWidth: 1,
      borderColor: theme.textColor,
      borderRadius: styles.common.borderRadius,
      padding: styles.common.spacing.small,
      color: theme.textColor,
      marginVertical: styles.common.spacing.small
    },
    button: {
      backgroundColor: styles.lightMode.accentColor,
      padding: styles.common.spacing.medium,
      borderRadius: styles.common.borderRadius,
      alignItems: 'center',
      marginVertical: styles.common.spacing.small
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: styles.common.fontSize.medium
    }
  });