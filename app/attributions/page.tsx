import { Link } from "@nextui-org/react"
import React from "react"
import "./attributions.styles.scss"

const page = () => {
  return (
    <>
      <h1 className="text-4xl mb-8">Attributions</h1>
      <div className="attributions">
        <section>
          <h2>Data Providers</h2>
          <ul className="list-disc list-inside">
            <li>
              Country data from{" "}
              <Link href="https://restcountries.com/" isExternal>
                REST Countries
              </Link>
            </li>
            <li>
              News data from{" "}
              <Link href="https://www.thenewsapi.com/" isExternal>
                The News API
              </Link>
            </li>
            <li>
              Weather data from{" "}
              <Link href="https://weatherstack.com/" isExternal>
                Weatherstack
              </Link>
            </li>
            <li>
              Currency data from{" "}
              <Link href="https://freecurrencyapi.com/" isExternal>
                Freecurrency API
              </Link>
            </li>
          </ul>
        </section>
        <section>
          <h2>UI Elements</h2>
          <ul className="list-disc list-inside">
            <li>
              Icons from{" "}
              <Link
                href="https://react-icons.github.io/react-icons/"
                isExternal
              >
                React Icons
              </Link>
            </li>
            <li>
              UI components from{" "}
              <Link href="https://nextui.org/" isExternal>
                NextUI
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </>
  )
}

export default page
