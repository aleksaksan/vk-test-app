import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";

class CounterStore {
  count = 0;

  get total() {
    return this.count*2;
  }

  constructor() {
    // makeObservable(this, {
    //   count: observable,
    //   increment: action,
    //   decrement: action,
    //   total: computed,
    // });
    makeAutoObservable(this);
  }

  increment = (value: number) => {
    this.count += value;
  };

  decrement = (value: number) => {
    this.count -= value;
  };
};

export default CounterStore;

const counter1 = new CounterStore();
export const Counter = observer(() => {
  const {count, total, increment, decrement} = counter1
  return (
    <>
      <button onClick={()=>increment(1)}>+</button>
      <span>{count}</span>
      <button onClick={()=>decrement(1)}>-</button>
      <div>{total}</div>
    </>
  )
});


type Props = {
  increment: (value: number) => void;
  decrement: (value: number) => void;
  count: number;
  total: number;
}

export const Counter2 = (({increment, decrement, count, total}: Props) => {
  
  return (
    <>
      <button onClick={()=>increment(1)}>+</button>
      <span>{count}</span>
      <button onClick={()=>decrement(1)}>-</button>
      <div>{total}</div>
    </>
  )
});

const counter2 = new CounterStore();
const counter3 = new CounterStore();
export const CountWrapper = observer(()=> {
  return (
    <>
      <Counter2 {...counter2} total={counter2.total} />
      <Counter2 {...counter3} total={counter3.total} />
    </>
  )
})