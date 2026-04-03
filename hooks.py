import os
import json

def on_config(config):
    """
    브라우저에서 TC_Detail 하위의 파일 목록을 자동으로 인식할 수 있도록 
    파일 목록을 자바스크립트 변수로 생성하여 저장하는 MkDocs 훅입니다.
    """
    docs_dir = config['docs_dir']
    detail_dir = os.path.join(docs_dir, 'TC_Detail')
    js_output_path = os.path.join(docs_dir, 'javascripts', 'tc_detail_list.js')

    # TC_Detail 폴더가 존재하는 경우에만 처리
    if os.path.exists(detail_dir):
        # .md 파일만 추출하고 확장자 제거
        # 숨김 파일이나 인덱스 파일 등 필요한 경우 필터링 가능
        detail_files = [
            f[:-3] for f in os.listdir(detail_dir) 
            if f.endswith('.md') and not f.startswith('.')
        ]
        
        # 파일 목록을 오름차순으로 정렬
        detail_files.sort()

        # 자바스크립트 파일 내용 생성 (전역 변수로 할당)
        js_content = f"window.TC_DETAIL_LIST = {json.dumps(detail_files, ensure_ascii=False)};"

        # javascripts 폴더가 없으면 생성
        os.makedirs(os.path.dirname(js_output_path), exist_ok=True)

        # 기존 파일 내용 읽기 (비교용)
        existing_content = ""
        if os.path.exists(js_output_path):
            with open(js_output_path, 'r', encoding='utf-8') as f:
                existing_content = f.read()

        # 내용이 변경된 경우에만 파일 쓰기 (무한 새로고침 방지)
        if js_content != existing_content:
            with open(js_output_path, 'w', encoding='utf-8') as f:
                f.write(js_content)
            print(f"INFO    -  [Hook] Updated TC_Detail list with {len(detail_files)} files.")
        # else:
        #     print(f"INFO    -  [Hook] TC_Detail list is already up to date.")
    else:
        print(f"WARNING -  [Hook] TC_Detail directory not found at: {detail_dir}")

    return config
