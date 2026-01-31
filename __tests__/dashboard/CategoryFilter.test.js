import { render, screen } from '@testing-library/react'
import CategoryFilter from '../../components/dashboard/CategoryFilter'

describe('CategoryFilter', () => {
    it('renders all category buttons', () => {
        render(<CategoryFilter />)

        expect(screen.getByText('Todo')).toBeInTheDocument()
        expect(screen.getByText('Tecnología')).toBeInTheDocument()
        expect(screen.getByText('Ciencias')).toBeInTheDocument()
        expect(screen.getByText('Servicios')).toBeInTheDocument()
        expect(screen.getByText('Artes/Deporte')).toBeInTheDocument()
        expect(screen.getByText('Académico')).toBeInTheDocument()
    })

    it('renders the active category with correct styling', () => {
        render(<CategoryFilter />)

        const todoButton = screen.getByText('Todo').closest('button')
        // Tailwind classes for active state: bg-slate-900 text-white
        expect(todoButton).toHaveClass('bg-slate-900')
        expect(todoButton).toHaveClass('text-white')
    })

    it('renders inactive categories with correct styling', () => {
        render(<CategoryFilter />)

        const techButton = screen.getByText('Tecnología').closest('button')
        // Tailwind classes for inactive: bg-white text-slate-500
        expect(techButton).toHaveClass('bg-white')
        expect(techButton).toHaveClass('text-slate-500')
    })
})
