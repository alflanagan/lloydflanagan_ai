import uvicorn


def main():
    uvicorn.run("src.lloydflanagan.app:app", host="0.0.0.0", port=8000, reload=True)


if __name__ == "__main__":
    main()
