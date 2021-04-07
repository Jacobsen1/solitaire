import React, { useCallback, useState } from 'react'
import { PlayingCard } from './playingCard'
import Grid from '@material-ui/core'

interface TestProps {
  click: Function;
}
interface ListProps {
}




export const List = (props: ListProps) => {
  console.log("main")
  const [test, setTest] = useState(0)
  function func() {
    console.log(test)
  }

  const callback = useCallback(() => {
    func()
  }, [test, setTest])
  let arr = [0, 0, 0, 0, 0]
  return (
    <>


      <PlayingCard suit={"t"} value={"2"} hidden={false} turned={false} column={0}>

        < PlayingCard suit={"t"} value={"2"} hidden={false} turned={false} column={0} />
      </PlayingCard>








    </>
  )
}


