import { useAuth0 } from "@auth0/auth0-react"
import Button from "@/components/Button"
import Icon from "@/components/Icon"

const Start = () => {
  const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0()
  const username = user?.given_name || ""

  return !isLoading && isAuthenticated ? (
    <section className="max-w-text">
      <h1 className="text-3xl mb-2 font-semibold">Välkommen {username}</h1>
      <p>
        För att komma igång klicka på{" "}
        <strong>
          <u>Mina klasser</u>
        </strong>{" "}
        i menyn. Lägg till nya klasser genom att fylla i fältet och sedan klicka
        på{" "}
        <strong>
          <u>Lägg till</u>
        </strong>
        .
      </p>
      <br></br>
      <p>
        Därefter kan du lägga till elever i klassen genom att klicka på klassens
        namn och sedan <strong>Redigera</strong>. Fyll i för- och efternamn,
        klicka sedan på{" "}
        <strong>
          <u>Lägg till elev</u>
        </strong>
        .
      </p>
    </section>
  ) : (
    <section>
      <h1 className="text-3xl mb-0.75 font-semibold">Hallå där!</h1>
      <p className="mb-1.5">
        Du verkar inte vara inloggad. Logga in genom att klicka på<br></br>{" "}
        knappen nedan eller i menyn.
      </p>
      <Button padding={false} onClick={loginWithRedirect}>
        <span>
          <span className="flex p-0.5 pl-1.25">
            <span>Logga in</span> <Icon className="flex" icon="arrow" />
          </span>
        </span>
      </Button>
    </section>
  )
}

export default Start
