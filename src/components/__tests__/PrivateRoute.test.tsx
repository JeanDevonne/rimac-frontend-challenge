import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../../test/utils';
import PrivateRoute from '../PrivateRoute';
import { useUser } from '../../contexts';
import { IUser } from '../../interfaces/user';

// Mock the useUser hook
vi.mock('../../contexts', () => ({
  useUser: vi.fn(),
}));

describe('PrivateRoute', () => {
  const TestComponent = () => <div>Protected Content</div>;

  const mockUser: IUser = {
    name: 'Test',
    lastName: 'User',
    phoneNumber: '123456789',
    birthDay: '1990-01-01',
    docType: 'DNI',
    docNumber: '12345678',
    acceptPrivacyPolicy: true,
    acceptCommercialPolicy: true,
    plan: {
      name: 'Basic',
      price: 100,
      description: ['Test plan'],
      age: 30
    }
  };

  it('should render children when user is authenticated', () => {
    // Mock authenticated user
    vi.mocked(useUser).mockReturnValue({ 
      user: mockUser,
      setUser: vi.fn()
    });

    render(
      <PrivateRoute>
        <TestComponent />
      </PrivateRoute>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should redirect to home when user is not authenticated', () => {
    // Mock unauthenticated user
    vi.mocked(useUser).mockReturnValue({ 
      user: null,
      setUser: vi.fn()
    });

    render(
      <PrivateRoute>
        <TestComponent />
      </PrivateRoute>
    );

    // The component should not be visible
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
}); 