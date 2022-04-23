import axios from "axios";
import React, { Component, Fragment } from "react";
import Moment from "react-moment";
import Fuse from "fuse.js";

import ImageUploading from "react-images-uploading";
import { Rating } from "@mui/material";

import { Dialog, Transition } from "@headlessui/react";
import { v4 as uuidv4 } from "uuid";
import DataTable from "../../table/DataTable";
import DeleteModal from "../../modal/DeleteModal";
import { showNotification } from "@mantine/notifications";

const column1 = [
  { id: "_id", label: "Review Id" },
  { id: "created_at", label: "Review Date" },
  { id: "rating", label: "Rating" },
  { id: "review", label: "Review" },
  { id: "options", label: "Options" },
];

const column2 = [
  { id: "_id", label: "Order Id" },
  { id: "productName", label: "Product Name" },
  { id: "status", label: "Status" },
  { id: "created_at", label: "Order Date" },
  { id: "options", label: "Options" },
];

var fuse;

var formData = new FormData();

export default class ManageReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      filteredData: [],
      unreviewed: [],
      search: "",
      page: 0,
      rowsPerPage: 10,
      open: false,
      id: "",
      images: "",
      review: "",
      errors: "",
      rating: "0",
      delId: "",
      delOpen: false,
      productId: "",
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }

  flattenObj(obj, parent, res = {}) {
    for (let key in obj) {
      let propName = parent ? parent + "." + key : key;
      if (typeof obj[key] == "object") {
        this.flattenObj(obj[key], propName, res);
      } else {
        res[propName] = obj[key];
      }
    }
    return res;
  }

  initializeFuse = () => {
    if (this.state.unreviewed != []) {
      const options = {
        includeScore: true,
        keys: Object.keys(this.flattenObj(this.state.unreviewed[0])),
      };

      fuse = new Fuse(this.state.unreviewed, options);
    }
  };

  submitReview = () => {
    const imgName = [];
    this.setState({ ...this.state, open: false });
    if (this.state.images != "") {
      this.state.images.map((i) => {
        const uniqueFileName = uuidv4() + "." + i.file.name.split(".").pop();

        imgName.push(uniqueFileName);

        formData.append(`images[]`, i.file, uniqueFileName);
      });
    }

    formData.append("review", this.state.review);
    formData.append("subOrderId", this.state.id);
    formData.append("rating", this.state.rating);
    formData.append("product_id", this.state.productId);

    axios
      .post("api/review", formData)
      .then((response) => {
        this.getData();
        showNotification({
          title: "Review Posted!",
          message:
            "The review has been posted!. Review will be visible to other users.",
          color: "green",
        });
      })
      .catch(
        (error) =>
          showNotification({
            title: "Review Error!",
            message: error.response.data.message,
            color: "red",
          })
      );
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    Promise.all([axios.get("/api/review"), axios.get("api/unreviewed")])
      .then((results) =>
        this.setState(
          {
            ...this.state,
            filteredData: results[1].data,
            reviews: results[0].data,
            unreviewed: results[1].data,
          },
          this.initializeFuse
        )
      )
      .catch((error) => console.log(error.response));
  }

  searchHandler = (event) => {
    if (event.target.value != "") {
      this.setState({
        ...this.state,
        search: event.target.value,
        filteredData: fuse.search(event.target.value).map((o) => o.item),
      });
    } else {
      this.setState({
        ...this.state,
        search: event.target.value,
        filteredData: this.state.unreviewed,
      });
    }
  };

  changeHandler = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };

  submitDelete = () => {
    axios
      .delete("/api/review/" + this.state.delId)
      .then((response) => {
        this.getData();
        showNotification({
          title: "Review Deleted!",
          message:
            "The review has been deleted!. You can now leave another review",
          color: "red",
        });
      })
      .catch((error) => console.log(error));
  };

  setDelOpen = (val) => {
    this.setState({ ...this.state, delOpen: val });
  };

  render() {
    const val = {
      open: this.state.delOpen,
      setOpen: this.setDelOpen,
      submit: this.submitDelete,
      message:
        "Are you sure you want to delete this product? All of the data will be permanently removed. This action cannot be undone.",
      title: "Delete product",
      success: "Delete",
    };

    const value = (column, row) => {
      switch (column.id) {
        case "created_at":
          return <Moment format="YYYY/MM/DD">{row["created_at"]}</Moment>;
        case "status":
          return <span className="capitalize">{row[column.id]}</span>;
        case "options":
          return (
            <>
              <a
                onClick={() =>
                  this.setState({
                    ...this.state,
                    id: row["_id"],
                    productId: row["product_id"],
                    open: true,
                  })
                }
                className="normal-case mr-2 min-h-0 h-9  btn btn-ghost btn-sm rounded-btn bg-green-400 hover:bg-green-500 text-white"
              >
                Leave a Review
              </a>
            </>
          );
        default:
          return row[column.id];
      }
    };

    const reviewedValue = (column, row) => {
      switch (column.id) {
        case "created_at":
          return <Moment format="YYYY/MM/DD">{row["created_at"]}</Moment>;
        case "rating":
          return <Rating value={row[column.id]} readOnly />;
        case "options":
          return (
            <>
              <a
                onClick={() =>
                  this.setState({
                    ...this.state,
                    delId: row["_id"],
                    delOpen: true,
                  })
                }
                className="normal-case mr-2 min-h-0 h-9  btn btn-ghost btn-sm rounded-btn bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </a>
              <a
                onClick={() =>
                  this.props.changePage({ page: "review", review: row })
                }
                className="normal-case mr-2 min-h-0 h-9  btn btn-ghost btn-sm rounded-btn bg-blue-500 hover:bg-blue-600 text-white"
              >
                View
              </a>
            </>
          );
        default:
          return row[column.id];
      }
    };

    return (
      <div className="w-11/12">
        <div class="text-sm breadcrumbs mt-3">
          <ul>
            <li>
              <a onClick={() => this.props.changePage({ page: "dashboard" })}>
                Dashboard
              </a>
            </li>
            <li>Reviews</li>
          </ul>
        </div>
        <div class="navbar shadow mt-3 mb-5 bg-white">
          <div class="flex-1 px-2 mx-2">
            <span class="text-lg font-semibold">Post a Review</span>
          </div>

          <div class="flex-none">
            <input
              name="search"
              type="text"
              placeholder="Search"
              value={this.state.search}
              onChange={(event) => this.searchHandler(event)}
              className="px-4 h-9 border-2 text-gray-500 focus:border-indigo-500 w-60 bg-gray-100 outline-none"
            />
          </div>
        </div>
        <DataTable
          columns={column2}
          filteredData={this.state.filteredData}
          data={this.state.unreviewed}
          value={value}
        />

        <div className="navbar shadow mt-10 mb-5 bg-white">
          <div className="flex-1 px-2 mx-2">
            <span className="text-lg font-semibold">Your Reviews</span>
          </div>
        </div>
        <DataTable
          columns={column1}
          filteredData={this.state.reviews}
          data={this.state.reviews}
          value={reviewedValue}
        />

        <Transition appear show={this.state.open} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={() =>
              this.setState({
                ...this.state,
                open: false,
                images: [],
                review: "",
                rating: "0",
              })
            }
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Leave a Review
                  </Dialog.Title>
                  <div className="mt-4">
                    <textarea
                      className="textarea textarea-bordered"
                      cols="100"
                      rows="10"
                      name="review"
                      onChange={this.changeHandler}
                      value={this.state.review}
                    />
                  </div>
                  <div className="mt-5">
                    My Rating
                    <br />
                    <Rating
                      name="no-value"
                      value={this.state.rating}
                      onChange={(event) =>
                        this.setState({
                          ...this.state,
                          rating: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="">
                    <h3 className="mb-2 mt-3">Upload Image</h3>
                    <ImageUploading
                      multiple
                      value={this.state.images}
                      onChange={(imageList) =>
                        this.setState({ ...this.state, images: imageList })
                      }
                      maxNumber="5"
                      dataURLKey="data_url"
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        // write your building UI
                        <div className="upload__image-wrapper border-blue-400 border-2 border-dotted bg-blue-100 min-h-40 p-10 mb-3">
                          <button
                            style={isDragging ? { color: "red" } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                            className="px-5"
                          >
                            Click or Drop here
                          </button>
                          &nbsp;
                          <button
                            onClick={() =>
                              this.setState({
                                ...this.state,
                                images: [],
                              })
                            }
                          >
                            Remove all images
                          </button>
                          <div className="flex gap-2 mt-2">
                            {imageList.map((image, index) => (
                              <div key={index} className="image-item">
                                <img
                                  src={image["data_url"]}
                                  alt=""
                                  width="100"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </ImageUploading>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="w-32 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={this.submitReview}
                    >
                      Post it!
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>

        <DeleteModal {...val} />
      </div>
    );
  }
}
