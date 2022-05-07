import React from "react"

const Button = ({ children, onClick, padding }: IButton) => {
  return (
    <button
      className={`rounded-md bg-dark text-white ${
        padding ? "p-0.5 pl-1.5 pr-1.5" : ""
      }`}
      onClick={() => onClick && onClick()}
    >
      {children}{" "}
    </button>
  )
}

interface IButton {
  children: JSX.Element | string
  onClick?: () => void
  padding?: boolean
}

Button.defaultProps = {
  padding: true,
}

export default Button
