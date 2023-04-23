import React from 'react'

function BlogCreate() {
  return (

      <section className="content">
                <div className="container-fluid">
                    <div className="row py-2">
                        <div className="col-6">
                            <button type="button" className="btn btn-default">
                                <i className="fas fa-chevron-left"></i> Quay lại
                            </button>
                            <button type="button" className="btn btn-info px-4">
                                Lưu
                            </button>
                            <button type="button" className="btn btn-primary px-4">
                                Preview
                            </button>
                        </div>

                        <div className="col-6 d-flex justify-content-end">
                            <button type="button" className="btn btn-danger px-4">
                                Xóa
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label>Tiêu đề</label>
                                                <input type="text" className="form-control" id="title" />
                                            </div>

                                            <div className="form-group">
                                                <label>Nội dung</label>
                                                <textarea id="content"></textarea>
                                            </div>

                                            <div className="form-group">
                                                <label>Mô tả ngắn</label>
                                                <textarea id="description" className="form-control" rows="3"></textarea>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Trạng thái</label>
                                                <select id="status" className="form-control">
                                                    <option value="0">
                                                        Nháp
                                                    </option>
                                                    <option value="1">
                                                        Công khai
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Danh mục</label>
                                                <div className="select2-purple">
                                                    <select className="select2 form-control" multiple="multiple" id="category">
                                                        <option>
                                                            Java
                                                        </option>
                                                        <option>
                                                            Golang
                                                        </option>
                                                        <option>
                                                            React
                                                        </option>
                                                        <option>
                                                            Lập trình web
                                                        </option>
                                                        <option>
                                                            Database
                                                        </option>
                                                        <option>
                                                            Tips Trick
                                                        </option>
                                                        <option>
                                                            Devops
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="thumbnail-preview-container mb-3">
                                                    <img src="" alt="" id="thumbnail" />
                                                </div>
                                                <button type="button" className="btn btn-info btn-flat" data-toggle="modal" data-target="#modal-xl">
                                                    Chọn hình ảnh
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
  )
}

export default BlogCreate