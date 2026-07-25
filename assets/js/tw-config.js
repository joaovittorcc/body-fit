// BODY FIT — Tailwind config compartilhado (tema "Elite Athleticism")
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "tertiary": "#c6c6c7",
        "on-primary-fixed": "#001550",
        "surface-variant": "#353436",
        "primary-fixed": "#dce1ff",
        "secondary": "#b2c5ff",
        "on-tertiary-fixed-variant": "#454747",
        "surface-bright": "#3a393a",
        "on-secondary-container": "#f3f3ff",
        "error": "#ffb4ab",
        "primary": "#b6c4ff",
        "on-secondary-fixed-variant": "#0040a1",
        "on-surface": "#e5e2e3",
        "surface-container-high": "#2a2a2b",
        "on-primary-container": "#acbcff",
        "surface-container-highest": "#353436",
        "surface-container-low": "#1c1b1c",
        "outline-variant": "#434654",
        "background": "#131314",
        "tertiary-fixed": "#e2e2e2",
        "primary-fixed-dim": "#b6c4ff",
        "on-primary-fixed-variant": "#003ab1",
        "tertiary-fixed-dim": "#c6c6c7",
        "surface-dim": "#131314",
        "inverse-surface": "#e5e2e3",
        "surface-container": "#201f20",
        "surface-tint": "#b6c4ff",
        "secondary-container": "#0065f6",
        "secondary-fixed": "#dae2ff",
        "error-container": "#93000a",
        "on-tertiary-fixed": "#1a1c1c",
        "on-error-container": "#ffdad6",
        "on-tertiary-container": "#bebfbf",
        "surface-container-lowest": "#0e0e0f",
        "on-primary": "#00277f",
        "on-error": "#690005",
        "outline": "#8e90a0",
        "inverse-primary": "#2553d2",
        "on-tertiary": "#2f3131",
        "secondary-fixed-dim": "#b2c5ff",
        "tertiary-container": "#4c4e4e",
        "primary-container": "#0040c1",
        "on-surface-variant": "#c4c5d6",
        "surface": "#131314",
        "on-secondary-fixed": "#001848",
        "on-background": "#e5e2e3",
        "on-secondary": "#002b73",
        "inverse-on-surface": "#313031"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "margin-mobile": "16px",
        "gutter": "24px",
        "sm": "12px",
        "xl": "80px",
        "margin-desktop": "64px",
        "md": "24px",
        "base": "8px",
        "xs": "4px",
        "lg": "48px"
      },
      fontFamily: {
        "label-md": ["Hanken Grotesk"],
        "body-md": ["Hanken Grotesk"],
        "title-lg": ["Hanken Grotesk"],
        "headline-lg": ["Anton"],
        "headline-md": ["Anton"],
        "display-lg": ["Anton"],
        "body-lg": ["Hanken Grotesk"],
        "headline-lg-mobile": ["Anton"]
      },
      fontSize: {
        "label-md": ["14px", { lineHeight: "20px", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "title-lg": ["22px", { lineHeight: "28px", fontWeight: "700" }],
        "headline-lg": ["48px", { lineHeight: "1.2", letterSpacing: "0.02em", fontWeight: "400" }],
        "headline-md": ["32px", { lineHeight: "1.2", fontWeight: "400" }],
        "display-lg": ["72px", { lineHeight: "1.1", letterSpacing: "0.02em", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "26px", fontWeight: "400" }],
        "headline-lg-mobile": ["32px", { lineHeight: "1.2", fontWeight: "400" }]
      }
    }
  }
};
