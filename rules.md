# Engineering & Coding Standards

As a premier engineering team, we uphold the highest software development standards, adopting principles recognized by industry leaders such as Google, Meta, and Amazon. Our target is a flawless, scalable, and maintainable enterprise-grade application.

## 1. Architectural Integrity & Modularity
- **Component-Driven Development:** Build self-contained, highly reusable components. Each component must follow the Single Responsibility Principle.
- **Separation of Concerns:** Keep business logic independent from presentation. Utilize custom hooks for state management and API interfacing.
- **Scalable Directory Structure:** Organize files by feature or domain rather than pure type (e.g., `features/auth/components`, not just `components/auth`).

## 2. Coding Conventions & Best Practices
- **Strict Typing:** TypeScript is non-negotiable. The use of `any` is strictly prohibited. Define explicit interfaces, types, and return values.
- **Clean Code principles:** Code must be readable, self-documenting, and concise. Avoid deep nesting. Always use descriptive variable and function names.
- **Absolute Imports:** Use path aliases (e.g., `@/components`, `@/utils`) instead of relative paths (`../../`).
- **Formatting & Linting:** ESLint and Prettier must be used rigorously. No warnings should be allowed in main branches.

## 3. Performance & Optimization (Web Vitals)
- **Aggressive Optimization:** The target Lighthouse score is >95 for Desktop and >90 for Mobile.
- **Lazy Loading & Code Splitting:** Use dynamic imports (e.g., Next.js `next/dynamic`) for heavy components like Three.js backgrounds, charts, or below-the-fold modules.
- **Render Efficiency:** Avoid unnecessary React re-renders. Use `memo`, `useMemo`, and `useCallback` deliberately.
- **Media Optimization:** All images must be compressed into Next.js `<Image />` formats (WebP/AVIF).
- **Placeholder Rule:** Use `nano-banana-pro` placeholders exclusively as asset fallbacks when original images are unavailable.

## 4. UI/UX & Design Alignment
- **Pixel-Perfect Execution:** Implement UI precisely aligned with the core styling (Tailwind CSS). Guarantee the 'enterprise-premium' feel through thoughtful micro-interactions.
- **Motion & Interactions:** Leverage Framer Motion and GSAP. Animations must run at 60fps and must enhance storytelling without distracting from the user objective.
- **Accessibility (a11y):** ARIA attributes, complete keyboard navigation, semantic HTML tags, and sufficient color contrast are mandatory. Ensure screen-reader compatibility from day one.

## 5. Testing & Quality Assurance
- **Local Validation:** Do not open the browser for manual testing inside automated flows. Rely on test suites or assume manual validation by the QA team (the user).
- **Automation First:** Validate functionality, accessibility, and styles proactively.
- **Robust Error Handling:** Wrap critical executions in `try/catch` and utilize Error Boundaries. Fail gracefully without breaking the user experience.

## 6. Security Principles
- **No Inline Execution:** Strictly avoid `eval()` or dangerous inline scripts. Ensure strict Content Security Policies (CSP).
- **Sanitize Inputs:** All user inputs must be processed and validated (e.g., using Zod) before interaction with internal APIs.