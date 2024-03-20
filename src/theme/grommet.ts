import { deepMerge } from 'grommet/utils';

export const palette = {
  White: '#FFFFFF',
  Black: '#0E0C1D',
};

export const darkTheme = {
  global: {
    focus: {
      border: {
        color: "transparent",
      },
    },
    colors: {
      backgroundContent: '#3C3C3C',
      backgroundMenu: '#323232'
    },
    palette,
    select: {
      clear: {
        color: "brand",
      },
    },
    font: {
      family: "Rubik",
      size: "14px",
      height: "22px",
      weight: 400
    },
  },
  checkBox: {
    size: '16px',
    color: 'white',
    border: {
      width: '2px',
      color: '#5359C6'
    },
    toggle: {
      color: '#5359C6'
    },
    icon: {
      size: '12px',
      extend: (props: any) => `
        background: #5359C6;
      `
    },
    check: {
      radius: '2px',
      thickness: '3px',
      extend: (props: any) => `
        border-color: #5359C6;
      `
    },
    hover: {
      border: {
        color: '#5359C6'
      },
    }
  },
  anchor: {
    color: 'text',
    textDecoration: "none",
    hover: {
      textDecoration: "none",
    },
  },
  button: {
    default: {}
  },
  dataTable: {
    border: {
      header: {
        color: 'border'
      }
    },
    body: {
      extend: (props: any) => ``
    },
  },
  text: {
    xsmall: {
      size: '10px',
      height: '18px',
    },
    small: {
      size: '12px',
      height: '20px',
    },
    medium: {
      size: '14px',
      height: '22px',
    },
    large: {
      size: '18px',
      height: '24px',
    },
    xlarge: {
      size: '22px',
      height: '28px',
    },
    xxlarge: {
      size: '26px',
      height: '32px',
    },
  }
};

export const lightTheme = deepMerge(darkTheme, {
  global: {
    colors: {
      backgroundContent: 'white',
      backgroundMenu: 'white'
    },
  },
});
