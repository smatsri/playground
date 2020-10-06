import { parse, HTMLElement } from "node-html-parser";
import request, { Options, Response } from "request";

const getFromOptions = async (req: Options) => {
  var [_, html] = await requestAsync(req)
  const pazzle = parseHtml(html)
  return pazzle;
}

const requestAsync = (options: Options) =>
  new Promise<[Response, any]>((res, rej) => {
    request(options, (error: any, response, body) => {
      if (error) {
        rej(error)
      } else {
        res([response, body])
      };
    })
  });

const parseHtml = (body: string) => {
  const root = <HTMLElement>parse(body);
  const cells = root.querySelectorAll(".tblcell");
  let input = [];
  for (const cell of cells) {
    let value = cell.innerHTML ? +cell.innerHTML : 0;
    input.push(value);
  }
  let id = +root.querySelector('#lvlss #ptitle').innerHTML.substring(1)
  let title = root.querySelector("#phead #ptitle").innerHTML;
  return ({ input, id, title });

}

export const getPazzle = (level = 5) => {
  return getFromOptions({
    url: "http://www.sudokutouch.com/",
    headers: {
      Cookie: "level=" + level
    }
  })
}

export const getPazzleById = (puzzleno: any = "513165662") => {
  return getFromOptions({
    url: "http://www.sudokutouch.com/",
    method: "POST",
    formData: {
      puzzleno
    }
  })
}