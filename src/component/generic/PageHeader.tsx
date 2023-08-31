import "./PageHeader.scss";

interface PageHeaderProps {
  title: string
  icon: JSX.Element
  children?: JSX.Element
}

export default function PageHeader(props: PageHeaderProps) {
  return (
    <div className={"page-header"}>
      <div className={"page-header-wrapper"}>
        <div className={"page-header-title"}>
          <div className={"page-header-title-icon"}>
            {props.icon}
          </div>
          <div className={"page-header-title-text"}>
            {props.title}
          </div>
        </div>
        {props.children}
      </div>
    </div>
  )
}