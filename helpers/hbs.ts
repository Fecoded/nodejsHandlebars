import moment from "moment";

export const formatDate = (date: Date | any, format: any) =>
  moment(date).format(format);

export const truncate = (str: string, len: number) => {
  if (str.length > len && str.length > 0) {
    let new_str = str + " ";
    new_str = str.substring(0, len);
    new_str = str.substring(0, new_str.lastIndexOf(" "));
    new_str = new_str.length > 0 ? new_str : str.substring(0, len);
    return new_str + "...";
  }
  return str;
};

export const stripTags = (input: string) => input.replace(/<(?:.|\n)*?>/gm, "");

type User = {
  [key: string]: string;
};

export const editIcon = (
  storyUser: User,
  loggedUser: User,
  storyId: User,
  floating = true
) => {
  if (storyUser._id.toString() == loggedUser._id.toString()) {
    if (floating) {
      return `<a href="/stories/${storyId}" class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-primary p-2"><i class="fas fa-edit fa-small"></i></a>`;
    } else {
      return `<a href="/stories/${storyId}"><i class="fas fa-edit"></i></a>`;
    }
  } else {
    return "";
  }
};

export const select = (selected: any, options: any) => {
  return options
    .fn(this)
    .replace(new RegExp(' value="' + selected + '"'), '$& selected="selected"')
    .replace(
      new RegExp(">" + selected + "</option>"),
      ' selected="selected"$&'
    );
};
