import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {App} from './App';

//TODO: Need to integrate Enzyme and add more tests!

it('renders without crashing', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<App />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe('div');
});
