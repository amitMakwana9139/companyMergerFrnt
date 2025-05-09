import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../redux/counterSlice';

export default function Counter() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div className="p-6 bg-white rounded shadow text-center">
            <h1 className="text-2xl font-bold mb-4">Counter: {count}</h1>
            <div className="flex justify-center space-x-4">
                <button
                    onClick={() => dispatch(decrement())}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                >
                    -
                </button>
                <button
                    onClick={() => dispatch(increment())}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                >
                    +
                </button>
            </div>
        </div>
    );
}
