import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import Timer from './Timer';

describe('Timer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the initial time', () => {
    render(<Timer initialTime="0:05" />);

    expect(screen.getByText('0:05')).toBeTruthy();
  });

  it('counts down one second per tick after starting', () => {
    render(<Timer initialTime="0:05" />);

    fireEvent.press(screen.getByText('Iniciar'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText('0:04')).toBeTruthy();
  });

  it('stops counting down when paused', () => {
    render(<Timer initialTime="0:05" />);

    fireEvent.press(screen.getByText('Iniciar'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.press(screen.getByText('Pausar'));
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByText('0:04')).toBeTruthy();
  });

  it('resets to the initial time and stops', () => {
    render(<Timer initialTime="0:05" />);

    fireEvent.press(screen.getByText('Iniciar'));
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    fireEvent.press(screen.getByText('Reset'));

    expect(screen.getByText('0:05')).toBeTruthy();
    expect(screen.getByText('Iniciar')).toBeTruthy();
  });

  it('stops exactly at 0:00 and calls onComplete once, with no extra tick', () => {
    const onComplete = jest.fn();
    render(<Timer initialTime="0:02" onComplete={onComplete} />);

    fireEvent.press(screen.getByText('Iniciar'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('0:01')).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('0:00')).toBeTruthy();
    expect(onComplete).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(screen.getByText('0:00')).toBeTruthy();
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
