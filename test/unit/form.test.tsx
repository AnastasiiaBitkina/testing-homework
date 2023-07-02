import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Form, FormProps } from '../../src/client/components/Form';
import '@testing-library/jest-dom';


describe('Form', () => {
  const onSubmitMock = jest.fn();

  const defaultProps: FormProps = {
    onSubmit: onSubmitMock,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Должен корректно отображать форму', () => {
    const { getByLabelText } = render(<Form {...defaultProps} />);
    expect(getByLabelText('Name')).toBeInTheDocument();
    expect(getByLabelText('Phone')).toBeInTheDocument();
    expect(getByLabelText('Address')).toBeInTheDocument();
  });

  it('Должен вызывать onSubmit при клике на кнопку Checkout с действительными данными', () => {
    const { getByLabelText, getByText } = render(<Form {...defaultProps} />);

    const nameInput = getByLabelText('Name') as HTMLInputElement;
    const phoneInput = getByLabelText('Phone') as HTMLInputElement;
    const addressTextarea = getByLabelText('Address') as HTMLTextAreaElement;
    const checkoutButton = getByText('Checkout');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(addressTextarea, { target: { value: '123 Main St' } });

    fireEvent.click(checkoutButton);

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith({
      name: 'John Doe',
      phone: '1234567890',
      address: '123 Main St',
    });
  });

  it('Не должен вызывать onSubmit при клике на кнопку Checkout с недействительными данными', () => {
    const { getByLabelText, getByText } = render(<Form {...defaultProps} />);

    const nameInput = getByLabelText('Name') as HTMLInputElement;
    const phoneInput = getByLabelText('Phone') as HTMLInputElement;
    const addressTextarea = getByLabelText('Address') as HTMLTextAreaElement;
    const checkoutButton = getByText('Checkout');

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(phoneInput, { target: { value: '123' } });
    fireEvent.change(addressTextarea, { target: { value: '' } });

    fireEvent.click(checkoutButton);

    expect(onSubmitMock).not.toHaveBeenCalled();
  });
});
