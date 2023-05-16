import { cleanup } from '@testing-library/react';
import { manageLongText } from '../text-formatter';

const longText = Array.from({ length: 200 }).map((_i: unknown, index) => index).join(' ');
const shortText = longText.slice(0, 30);

afterEach(() => cleanup());

test('manageLongText function return value with long test', () => {
    expect(manageLongText(longText, 40)).toMatch(/.../);
});

test('manageLongText function return value with short test', () => {
    expect(manageLongText(shortText, 100)).toBe(shortText);
});

test('manageLongText function return value with falsy input test', () => {
    expect(manageLongText(false as any, 20)).toBe('');
});
