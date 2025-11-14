/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			// Custom theme colors
  			amber: {
  				50: 'hsl(var(--amber-50))',
  				100: 'hsl(var(--amber-100))',
  				500: 'hsl(var(--amber-500))',
  				600: 'hsl(var(--amber-600))',
  				700: 'hsl(var(--amber-700))'
  			},
  			silver: {
  				50: 'hsl(var(--silver-50))',
  				100: 'hsl(var(--silver-100))',
  				500: 'hsl(var(--silver-500))',
  				600: 'hsl(var(--silver-600))'
  			},
  			purple: {
  				50: 'hsl(var(--purple-50))',
  				100: 'hsl(var(--purple-100))',
  				500: 'hsl(var(--purple-500))',
  				600: 'hsl(var(--purple-600))',
  				700: 'hsl(var(--purple-700))'
  			}
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-in',
  			'slide-up': 'slideUp 0.5s ease-out',
  			'scale-in': 'scaleIn 0.3s ease-out'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': { opacity: '0', transform: 'translateY(10px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' }
  			},
  			slideUp: {
  				'0%': { transform: 'translateY(20px)', opacity: '0' },
  				'100%': { transform: 'translateY(0)', opacity: '1' }
  			},
  			scaleIn: {
  				'0%': { transform: 'scale(0.9)', opacity: '0' },
  				'100%': { transform: 'scale(1)', opacity: '1' }
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
