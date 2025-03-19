import {FunctionComponent} from 'react'
import {NavPillProps} from '@/app/types/types'

interface NavigationProps {
    title: string,
    icons: NavPillProps[],
}

const Navigation: FunctionComponent<NavigationProps> = ({data}) => {
  return (
    <nav>
    <header className={"w-full"}>
      <div>{data.title}</div>
      <div className={"px-8 py-4"}>
        {data.icons.map((x) => (
          <div key={x.icon}>{x.title}</div>
        ))}
      </div>
    </header>
    </nav>
  )
}

export default Navigation