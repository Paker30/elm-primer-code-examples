module Main exposing (main)

import Browser
import Html exposing (Html)
import Html.Attributes as Attributes
import Html.Events as Events
import Http exposing (Error(..))
import Json.Decode as Decode exposing (Decoder)



-- ENTRYPOINT


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }



-- MODEL


init : () -> ( Model, Cmd Msg )
init () =
    ( { phrase = Loading
      }
    , fetchLgtmPhrase GotPhrase
    )


type alias Model =
    { phrase : Phrase
    }

type alias PhrasePayload =
    { phrase: String
    , source: String
    , length: Int
    }

type Phrase
    = Loading
    | Success PhrasePayload
    | Error Error



-- UPDATE


type Msg
    = ChangePhrase
    | GotPhrase (Result Error PhrasePayload)
    | CopyToClipboard


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ChangePhrase ->
            ( { model | phrase = Loading }, fetchLgtmPhrase GotPhrase )

        GotPhrase result ->
            case result of
                Ok newPhrasePayload ->
                    ( { model | phrase = Success newPhrasePayload }, Cmd.none )

                Err err ->
                    ( { model | phrase = Error err }, Cmd.none )

        CopyToClipboard ->
            -- We'll implement clipboard access in Chapter 8 when we cover JavaScript interop
            ( model, Cmd.none )



-- CMD


fetchLgtmPhrase : (Result Error PhrasePayload -> Msg) -> Cmd Msg
fetchLgtmPhrase toMsg =
    Http.get
        { url = "http://localhost:3000/lgtm"
        , expect = Http.expectJson toMsg phraseDecoder
        }



-- VIEW


view : Model -> Html Msg
view model =
    Html.div []
        [ Html.span
            [ Events.onClick CopyToClipboard
            ]
            [ viewPhrase model.phrase ]
        , Html.span
            [ Events.onClick ChangePhrase
            , Attributes.style "border" "thin solid black"
            , Attributes.style "cursor" "pointer"
            ]
            [ Html.text "⟳" ]
        ]


viewPhrase : Phrase -> Html Msg
viewPhrase phrase =
    case phrase of
        Success payload ->
            Html.span
                [Attributes.title <| "An LGTM quote for your PR review! Source:" ++ payload.source
                ]
                [ Html.text payload.phrase]
        Loading ->
            Html.text "Loading..."
        Error err ->
            case err of
                BadStatus status ->
                    status
                        |> String.fromInt
                        |> String.append "Http error: "
                        |> Html.text
                _ ->
                    Html.text "Unknown error"
        

phraseDecoder : Decoder PhrasePayload
phraseDecoder =
    Decode.map3 PhrasePayload
        (Decode.field "phrase" Decode.string)
        (Decode.field "source" Decode.string)
        (Decode.field "length" Decode.int)